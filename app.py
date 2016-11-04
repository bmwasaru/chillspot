import os

from flask import Flask, render_template, redirect, url_for, request, jsonify

from models import db, Spot

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/tukutane.db'

db.init_app(app)
with app.app_context():
    db.create_all()


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/spots')
def get_spots():
    spots = Spot.query.all()
    res = [spot.serialize() for spot in spots]
    return jsonify(spots=res)


@app.route('/spots/add', methods=['POST'])
def add_spot():
    fields = ['name', 'description', 'lat', 'lng']
    vals = dict([(k, request.form.get(k)) for k in fields])
    print(vals)
    try:
        spot = Spot(**vals)
        db.session.add(spot)
        db.session.commit()
    except:
        pass
    return redirect(url_for('home'))


@app.route('/robots.txt')
def robots():
    res = app.make_response('User-agent: *\nAllow: /')
    res.mimetype = 'text/plain'
    return res


port = os.getenv('PORT', '5000')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))
