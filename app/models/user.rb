class User < ApplicationRecord
    has_secure_password
    has_and_belongs_to_many :movies
    has_many :comments
    has_many :recommended_to, :class_name => 'Recommendation', :foreign_key => 'recommended_to_id'
    has_many :recommended_from, :class_name => 'Recommendation', :foreign_key => 'recommended_from_id'
  
    def user_params
        params.require(:user).permit( :username, :email, :password )
    end

end
