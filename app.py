from flask import Flask, render_template, request, redirect, flash, session
import sqlite3
import os as s


app = Flask(__name__)
app.secret_key = 'sX9#bq3T@1&f8zP2jY!rN)UvWkMaEoRs'
MY_PASS = "Stephenson18$(CODE-CRAZE)"

base_dir = s.path.dirname(s.path.abspath(__file__))
db_path = s.path.join(base_dir, "mySQLite.db")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        try:
            cursor.execute('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', (name,email,message))
            print("saving: ", name, email, message)
            conn.commit()
        except Exception as e:
            print("Error inserting message: ", e)

        conn.close()
        flash("Message sent successfully!")
        return redirect('/contact')

    return render_template('contact.html')


@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/admin-login', methods= ['POST', 'GET'])
def admin_login():
    if request.method == 'POST':
        password = request.form.get('password')
        if password == MY_PASS:
            session['admin'] = True
            flash("success")
            return redirect('/admin')
        else:
            flash("Incorrect password")
            return redirect('/admin-login')

    return render_template('admin-login.html')

@app.route('/logout')
def logout():
    session.pop('admin', None)
    flash("Logged out")
    return redirect('/admin-login')

@app.route('/admin')
def admin():
    if not session.get('admin'):
        flash("You must be logged-in")
        return redirect('/admin-login')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    messages = cursor.execute('SELECT * FROM messages').fetchall()

    conn.close()
    return render_template('admin.html', messages=messages)

@app.route('/delete/<int:id>')
def delete_message(id):
    if not session.get('admin'):
        return redirect('/admin-login')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM messages WHERE id=?', (id,))
    conn.commit()
    conn.close()
    flash("Messages deleted")
    return redirect('/admin')

@app.route('/delete-all')
def delete_all_message():
    if not session.get('admin'):
        return redirect('/admin-login')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM messages')
    conn.commit()
    conn.close()
    flash("All messages deleted")
    return redirect('/admin')


if __name__ == '__main__':
    app.run(debug=True)


