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


    def title
        @movie = Movie.find_by_title(params[:title])
        
        if @movie.save
            render json: @movie, status: :ok
          else
            render json: @movie.errors, status: :unprocessable_entity
        end     
    end

    def comment
        @comment = Comment.where("user_id = #{params[:user_id]} AND movie_id=#{params[:movie_id]} AND id=#{params[:comment_id]}", params[:user_id],params[:movie_id],params[:comment_id])
        render json: @comment, status: :ok

    end

    def comments
        @comments = Comment.where("user_id = #{params[:user_id]} AND movie_id=#{params[:movie_id]}", params[:user_id],params[:movie_id])
        render json: @comments, status: :ok
    end

    def comment_destroy
        @comment = Comment.where("user_id = #{params[:user_id]} AND movie_id=#{params[:movie_id]} AND id=#{params[:comment_id]}", params[:user_id],params[:movie_id],params[:comment_id])
        @comment.destroy(params[:comment_id])
    end

    def comment_update
        @comment = Comment.where("user_id = #{params[:user_id]} AND movie_id=#{params[:movie_id]} AND id=#{params[:comment_id]}", params[:user_id],params[:movie_id],params[:comment_id])
        # @comment.update(comment_params)
        if @comment.update(comment_params)
            render json: @comment
          else
            render json: @comment.errors, status: :unprocessable_entity
          end
    end


   


    private

    def movie_params
        params.require(:movie).permit(:title, :description, :imgUrl)
    end

    def comment_params
        params.require(:comment).permit(:body)
    end
    

end