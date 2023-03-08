# Express Starter

## Set Up DB

Create a `.env` file and add a variable `MONGODB_URL` set equal to your MongoDB connection string 

## Running the application

To run the application in development, run:
`npm run dev`

To run the application in production, first run:
`npm run build`
Then:
`npm start`

### Instructions
Create a simple express server that can Create, Read, Update and Delete 5 models (separate from your previous one). 
You will be using Mongoose as an ORM and MongoDB as your database. There should also be one model that has a one to 
many relationship as part of it’s schema.  Routes should be tested and unit tests for modules.

### Plan
Models:
  - Scales:
    - Ionian
    - Melodic Minor
    - Harmonic Minor
    - Harmonic Major
    - Major Pentatonic
    - Modes (relation)
  - Modes:
    - Name
  - MusicGenres:
    - Name (jazz, rock, traditional East Asian, etc)
    - Origin (country)
  - Composers:
    - Name
    - dob
    - scalesUsed (relation)
    - musicGenres (relation)
  - Compositions:
    - Name
    - musicGenre (relation)
    - Composer (relation)
    - Scales (relation)

Example: 
```
  let ComposerSchema = new Schema({
  name: String,
  dob: Date,
  scalesUsed: [
    {
      type: Schema.Types.ObjectId,
      ref: "Scales"
    },
    musicGenres: [
      {
        type: Schema.Types.ObjectId,
        ref: "MusicGenres"
      }
    ]
  ]
 })
 ```