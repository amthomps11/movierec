class UsersController < ApplicationController
    
    # before_action :authorize_request, except: :create
    
    def index
        @user = User.all()
        render json: @user, include: [:movies, :comments, :recommended_to, :recommended_from]
      end
    
    def show
        @user = User.find(params[:id])
        render json: @user, include: :movies
    end

    def create 
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
          else
            render json: @user.errors, status: :unprocessable_entity
        end

    end

    def unlike
        @user = User.find(params[:id])
        @movie = Movie.find(params[:movie_id])
        @user.movies.delete(@movie)
        render json: @user
    end


    def get_friends
        @friends = Friend.joins("JOIN users ON users.id = friends.user2id").where("friends.user1id = #{params[:user_id]}").where("friends.confirmed=true")
        render json: @friends
     
    end

    def get_friend_requests
        @friends = Friend.joins("JOIN users ON users.id = friends.user2id").where("friends.user1id = #{params[:user_id]}").where("friends.confirmed=false")
        render json: @friends
     
    end






    
    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

    

end