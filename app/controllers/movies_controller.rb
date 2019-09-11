class MoviesController < ApplicationController
    
    # before_action :authorize_request, except: :create
    def index
        @movie = Movie.all()
        render json: @movie
      end
    
    def show
        @movie = Movie.find(params[:id])
        render json: @movie
    end

    def create
        
        @movie = Movie.new(movie_params)
        puts movie_params
        if @movie.save
            render json: @movie, status: :created
          else
            render json: @movie.errors, status: :unprocessable_entity
        end

    end

    private

    def movie_params
        params.require(:movie).permit(:title, :description, :imgUrl)
    end

    

end