import sqlite3
from sqlite3 import *
connexion = sqlite3.connect("game.db")
curseur = connexion.cursor()
data = curseur.execute("SELECT * from Map;")
table = []
for row in data:
    ligne = {
            'name': row[1],
            'nbuse':row[3],
            'path':row[2]
        }
    table.append(ligne)

print(table[0].name)
