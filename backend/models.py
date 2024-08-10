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

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "species": self.species.value,  
            "weight": self.weight,
            "imgUrl": self.img_url,
        }

