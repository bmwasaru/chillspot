from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Spot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(125))
    description = db.Column(db.Text())
    lat = db.Column(db.Float())
    lng = db.Column(db.Float())
    created = db.Column(db.Date, default=datetime.now)
    updated = db.Column(db.Date, onupdate=datetime.now)

    def __repr__(self):
        return '<Spot %r>' % self.title

    def serialize(self):
        return {
            'name': self.name,
            'description': self.description,
            'lat': self.lat,
            'lng': self.lng
        }
