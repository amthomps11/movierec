class RecommendationsController < ApplicationController
    
    def index
        @recommendation = Recommendation.all()
        render json: @recommendation
      end
    

end