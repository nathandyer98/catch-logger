from app import app, db
from flask import request, jsonify
from models import Catch, FishSpecies


# Get All Catches Sorted by Date Caught by default
@app.route("/api/catches", methods=["GET"])
def get_catches():
    # Get parameters from the query string
    sort_by = request.args.get("sortBy", "date") 
    name_filter = request.args.get("name", None) 

    # Determining the sort type
    if sort_by.startswith("-"):
        sort_by = sort_by[1:]
        order = "desc"
    else:
        order = "asc"

    # Sort field options
    sort_options = {
        "name": Catch.name,
        "species": Catch.species,
        "weight": Catch.weight,
        "date": Catch.date_caught,
    }

    # Initialise the sorting column based on the `sortBy` parameter
    sort_column = sort_options.get(sort_by)

    # Error handling for sort field
    if sort_column is None:
        return jsonify({"error": "Invalid sort field"}), 400

    # Apply ascending or descending order based on the `order` parameter
    if order == "desc":
        sort_column = sort_column.desc()
    else:
        sort_column = sort_column.asc()

    # Start with the base query
    query = Catch.query

    # Apply the name filter if provided
    if name_filter:
        query = query.filter(Catch.name.ilike(f"%{name_filter}%"))

    # Apply sorting
    query = query.order_by(sort_column)

    # Execute the query and fetch all results
    catches = query.all()

    # Return the results as JSON
    return jsonify([catch.to_json() for catch in catches])


# Create a Catch
@app.route("/api/catches", methods=["POST"])
def create_catch():
    try:
        # JSONifying the request and storing it in data
        data = request.json

        # Validations checks for missing required field and throwing a 400 error if failed
        required_fields = ["name", "species", "weight", "date_caught"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Storing data into corresponding variable
        name = data.get("name")
        species = data.get("species")
        weight = data.get("weight")
        img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        date_caught = data.get("date_caught")
        rig_info = data.get("rig_info")
        bait_info = data.get("bait_info")
        distance = data.get("distance")
        location = data.get("location")
        comments = data.get("comments")

        # Validation for checking if input Species is within within the fish species ENUM
        if species not in [species.value for species in FishSpecies]:
            return (
                jsonify(
                    {
                        "error": f"Invalid species: {species}. Must be one of {[s.value for s in FishSpecies]}"
                    }
                ),
                400,
            )

        # Creating a new catch object with validated data
        new_catch = Catch(
            name=name,
            species=species,
            weight=weight,
            img_url=img_url,
            date_caught=date_caught,
            rig_info=rig_info,
            bait_info=bait_info,
            distance=distance,
            location=location,
            comments=comments,
        )

        # Staging and commiting the add to database
        db.session.add(new_catch)
        db.session.commit()

        
        return jsonify(new_catch.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Delete a Catch by provided ID
@app.route("/api/catches/<int:id>", methods=["DELETE"])
def delete_catch(id):
    try:
        # Store the catch of given ID
        catch = Catch.query.get(id)
        # Checking if catch exist based on ID
        if catch is None:
            return jsonify({"error": "Catch not found"}), 404

        # Staging and commiting the delete to database
        db.session.delete(catch)
        db.session.commit()

        return jsonify({"msg": "Catch deleted"}), 200

 
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Updating a Catch by provided ID
@app.route("/api/catches/<int:id>", methods=["PATCH"])
def update_catch(id):
    try:
        # Store the catch of given ID
        catch = Catch.query.get(id)
        # Checking if catch exist based on ID
        if catch is None:
            return jsonify({"error": "Catch not found"}), 404

        # # JSONifying the request and storing it in data
        data = request.json

        # Update Catch fields with the corresponding data fields
        catch.name = data.get("name", catch.name)
        catch.species = data.get("species", catch.species)
        catch.weight = data.get("weight", catch.weight)
        catch.date_caught = data.get("date_caught", catch.date_caught)
        catch.rig_info = data.get("rig_info", catch.rig_info)
        catch.bait_info = data.get("bait_info", catch.bait_info)
        catch.distance = data.get("distance", catch.distance)
        catch.location = data.get("location", catch.location)
        catch.comments = data.get("comments", catch.comments)

        # Commiting change to database
        db.session.commit()
        return jsonify(catch.to_json()), 200

   
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
