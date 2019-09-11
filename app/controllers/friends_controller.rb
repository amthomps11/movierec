class FriendsController < ApplicationController
  
    # before_action :authorize_request, except: :create
    def index
        @friend = Friend.all()
        render json: @friend
      end
    
    def show
        @friend = Friend.find(params[:id])
        render json: @friend
    end

end