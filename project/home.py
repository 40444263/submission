from flask import *
app = Flask(__name__)

@app.route("/")
def root():
    return redirect(url_for('home'))

@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/play")
def play():
    return render_template("game.html")


@app.route("/map")
def map():
    return "Map a faire"

@app.route("/commands")
def commands():
    return "Commands a faire"

@app.route("/characters")
def characters():
    return "characters a faire"
if __name__ == " __main__ ":
    app.run ( host ='0.0.0.0 ', debug = True )
