from app import app, db
from flask import request, jsonify
from models import Catch, FishSpecies

# Get All Catches
@app.route("/api/catches",methods=["GET"])
def get_catches():
  catches = Catch.query.all()
  result = [catch.to_json() for catch in catches]
  return jsonify(result)

# Create a Catch
@app.route("/api/catches",methods=["POST"])
def create_catch():
  try:
    data = request.json

    #Validations
    required_fields = ["name","species","weight"]
    for field in required_fields:
      if field not in data or not data.get(field):
        return jsonify({"error":f'Missing required field: {field}'}), 400
      
      
    name = data.get("name")
    species = data.get("species")
    weight = data.get("weight") 
    img_url = "https://avatar.iran.liara.run/public/boy?carpy"

    if species not in [species.value for species in FishSpecies]:
      return jsonify({"error": f'Invalid species: {species}. Must be one of {[s.value for s in FishSpecies]}'}), 400
    
    new_catch = Catch(name=name, species=species, weight=weight, img_url=img_url)

    db.session.add(new_catch) 
    db.session.commit()

    return jsonify(new_catch.to_json()), 201
    
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}), 500
  
#Delete a Catch
@app.route("/api/catches/<int:id>",methods=["DELETE"])
def delete_catch(id):
  try:
    catch = Catch.query.get(id)
    if catch is None:
      return jsonify({"error":"Catch not found"}), 404
  
    db.session.delete(catch)
    db.session.commit()
    return jsonify({"msg":"Catch deleted"}), 200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500

@app.route("/api/catches/<int:id>",methods=["PATCH"])
def update_catch(id):
  try:
    catch = Catch.query.get(id)
    if catch is None:
      return jsonify({"error":"Catch not found"}), 404
    
    data = request.json

    catch.name = data.get("name",catch.name)
    catch.species = data.get("species",catch.species)
    catch.weight = data.get("weight",catch.weight)

    db.session.commit()
    return jsonify(catch.to_json()),200
  except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500

