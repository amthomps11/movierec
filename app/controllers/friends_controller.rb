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

    def create 
        @friend = Friend.new(friend_params)
        puts friend_params
        if @friend.save
            render json: @friend, status: :created
          else
            render json: @friend.errors, status: :unprocessable_entity
        end

    end

    def update
        @friend = Friend.find(params[:id])
        @friend.update(friend_params)
        render json: @friend

    end

    def destroy
        @friend = Friend.find(params[:id])
        @friend.destroy
    end


    def findspecificfriend
        @friend = Friend.where("user1id = #{params[:user1id]} AND user2ID=#{params[:user2id]}", params[:user1id],params[:user2id])
        render json: @friend, status: :created
    end

    def editspecificfriend
        @friend = Friend.where("user1id = #{params[:user1id]} AND user2ID=#{params[:user2id]}", params[:user1id],params[:user2id])
        @friend.update(friend_params)
        render json: @friend
    end
    
    private

    def friend_params
        params.require(:friend).permit(:user1id, :user2id, :confirmed)
    end 

end

