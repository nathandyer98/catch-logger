from app import db
import enum
from sqlalchemy import Enum


class FishSpecies(enum.Enum):
    Carp = "Carp"
    Bream = "Bream"
    Tench = "Tench"
    Catfish = "Catfish"
    Pike = "Pike"
    Perch = "Perch"
    Roach = "Roach"
    Rudd = "Rudd"


class Catch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(Enum(FishSpecies), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    date_caught = db.Column(db.String(16), nullable=False)
    rig_info = db.Column(db.String(20), nullable=True)
    bait_info = db.Column(db.String(20), nullable=True)
    distance = db.Column(db.String(20), nullable=True)
    location = db.Column(db.String(20), nullable=True)
    comments = db.Column(db.String(100), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "species": self.species.value,
            "weight": self.weight,
            "imgUrl": self.img_url,
            "dateCaught": self.date_caught,
            "rigInfo": self.rig_info,
            "baitInfo": self.bait_info,
            "distance": self.distance,
            "location": self.location,
            "comments": self.comments,
        }
