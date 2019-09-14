class UsersController < ApplicationController
    
    # before_action :authorize_request, except: :create
    
    def index
        @user = User.all()
        render json: @user, include: [:movies, :comments]
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
    
    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

    

end