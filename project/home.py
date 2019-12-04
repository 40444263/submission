from flask import *
import sqlite3
from sqlite3 import *
import shutil
import json
app = Flask(__name__)

@app.route("/")
def root():
    return redirect(url_for('home'))

@app.route("/home")
def home():
    id = request.args.get('id','')
    if (id != ""):
        connexion = sqlite3.connect("static/game.db")
        curseur = connexion.cursor()
        data = curseur.execute("SELECT \"Path picture\" from Map where id =" + id +";")
        for row in data:
            shutil.copy(row[0],"static/background.jpg")
        connexion.close()
    return render_template("home.html")


@app.route("/play")
def play():
    return render_template("game.html")


@app.route("/map")
def map():
    connexion = sqlite3.connect("static/game.db")
    curseur = connexion.cursor()
    data = curseur.execute("SELECT * from Map;")
    table = []
    for row in data:
        ligne = {
                'name': row[1],
                'nbuse':row[3],
                'path':row[2],
                'id':row[0]
            }
        table.append(ligne)
    connexion.close()

    return render_template("map.html",table=table)

@app.route("/commands")
def commands():
    return "Commands a faire"

@app.route("/characters")
def characters():
    return render_template("characters.html")

@app.route("/play/endgame",methods =['POST','GET'])
def endgame():
    if (request.method == "POST"):
        connexion = sqlite3.connect("static/game.db")
        curseur = connexion.cursor()
        requete = "Insert into Match (Player1Win,Player2Win,NbHitPlayer1,NbHitPlayer2,Time) values(?,?,?,?,?);"
        curseur.execute(requete,(str(request.form["Player1Win"]),str(request.form["Player2Win"]),request.form["NbHitPlayer1"],request.form["NbHitPlayer2"],request.form["Time"]))
        connexion.commit()
        connexion.close()
        return "ok"
    else:
        connexion = sqlite3.connect("static/game.db")
        curseur = connexion.cursor()
        data = curseur.execute("SELECT * from Match where id = (SELECT MAX(id) from Match);")
        for row in data:
            ligne = {
                    'Player1Win': row[0],
                    'Player2Win':row[1],
                    'NbHitPlayer1':row[2],
                    'NbHitPlayer2':row[3],
                    'Time':row[4],
                }
        connexion.close()
        return render_template("endgame.html",info=ligne)





if __name__ == " __main__ ":
    app.run(host ='0.0.0.0 ', port=80, debug = True)
