from app import app, db
from flask import request, jsonify
from models import Catch, FishSpecies


# Get All Catches Sorted by Date Caught by default
@app.route("/api/catches", methods=["GET"])
def get_catches():
    # Get sorting parameters from the query string
    sort_by = request.args.get("sortBy", "date")  # Default to sorting by 'date'

    # Determine if the sort order should be descending based '-'
    if sort_by.startswith("-"):
        sort_by = sort_by[1:]  # Remove the '-'
        order = "desc"
    else:
        order = "asc"

    # Mapping of the sorting fields based on the model
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

    # Query All in database and apply an order by the 'sort_column'
    catches = Catch.query.order_by(sort_column).all()

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
        )

        # Staging and commiting the add to database
        db.session.add(new_catch)
        db.session.commit()

        # Return the new Catch object as a JSON to the Frontend
        return jsonify(new_catch.to_json()), 201

    # Error handling, return session the previous state and output error as JSON, 500
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

        # Returning Catch deleted msg, 200
        return jsonify({"msg": "Catch deleted"}), 200

    # Error handling, return session the previous state and output error as JSON, 500
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

        # Commiting change to database
        db.session.commit()
        return jsonify(catch.to_json()), 200

    # Error handling, return session the previous state and output error as JSON, 500
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
