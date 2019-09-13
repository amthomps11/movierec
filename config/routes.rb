Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/auth/login', to: 'authentication#login'
  post '/likes/:user_id/:movie_id', to: 'likes#likes'
  get '/movies/title', to: "movies#title"
  get "/movies/comments", to: "movies#comments"
  resources :users
  resources :movies
  resources :friends
  resources :comments

end
