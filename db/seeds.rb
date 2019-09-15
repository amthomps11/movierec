# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.create(username: "AlexThomps",password:"password",email:"alex@mail.com")
user2 = User.create(username: "ChrisThomps",password:"password",email:"chris@mail.com")
user3 = User.create(username: "MissyThomps",password:"password",email:"missy@mail.com")
user4 = User.create(username: "DadThomps",password:"password",email:"dad@mail.com")


# movie1 = Movie.create(title: "Back To The future",description:"marty goes back to the future")
# movie2 = Movie.create(title: "Forest Gump", description:"Forrest gump Runs a lot and meets jenny")

# Friend.create(user1id: 1,user2id: 2, confirmed:true )





# user1.movies.push(movie1)
# user2.movies.push(movie2)
