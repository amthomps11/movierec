class LikesController < ApplicationController
    
    def likes
        @user = User.find(params[:user_id])
        @movie = Movie.find(params[:movie_id])
        @user.movies.push(@movie)
        render json: @user, include: :movies
    end

end
