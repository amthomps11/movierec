class RecommendationsController < ApplicationController
    
    def index
        @recommendation = Recommendation.all()
        render json: @recommendation
    end


    def create
        @recommendation = Recommendation.new(recommendation_params)
        if @recommendation.save
            render json: @recommendation, status: :created
          else
            render json: @recommendation.errors, status: :unprocessable_entity
        end

    end

    def get_specific_rec
        @recommendation = Recommendation.where("recommended_from_id = #{params[:friend_id]} AND recommended_to_id=#{params[:user_id]}", params[:user_id],params[:friend_id])
        render json: @recommendation, status: :ok
    end

    def get_all_recs
        @recommendation = Recommendation.where("recommended_to_id=#{params[:user_id]}", params[:user_id])
        render json: @recommendation, status: :ok
    end


    private
    def recommendation_params
        params.require(:recommendation).permit(:movie_id, :recommended_from_id, :recommended_to_id)
    end


end