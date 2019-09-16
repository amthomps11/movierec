Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  post '/auth/login', to: 'authentication#login'
  post '/likes/:user_id/:movie_id', to: 'likes#likes'
  
  get '/movies/title', to: "movies#title"
  get "/movies/comments", to: "movies#comments"
  get "/movies/comment", to: "movies#comment"
  delete "/movies/comment_destroy", to: "movies#comment_destroy" 
  put "/movies/comment_update", to: "movies#comment_update"


  put "/users/unlike", to: "users#unlike"
  get "/users/get_friends", to:"users#get_friends"
  get "/users/get_recs", to:"users#get_recs"
  get "/users/get_friend_requests", to:"users#get_friend_requests"


  get "/friends/findspecificfriend", to: "friends#specificfriend"
  put "/friends/editspecificfriend", to: "friends#editspecificfriend"


  get "/recommendations/get_specific_rec", to: "recommendations#get_specific_rec"
  get "/recommendations/get_all_recs", to: "recommendations#get_all_recs"

  
  resources :users
  resources :movies
  resources :comments
  resources :friends
  resources :recommendations
  



end
