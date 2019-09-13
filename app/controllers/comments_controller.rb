class CommentsController < ApplicationController
    
    # before_action :authorize_request, except: :create
    def index
        @comment = Comment.all()
        render json: @comment
      end
    
    def show
        @comment = Comment.find(params[:id])
        render json: @comment
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render json: @comment, status: :created
          else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end


    private

    def comment_params
        params.require(:comment).permit(:body, :user_id, :movie_id)
    end


end