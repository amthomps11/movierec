class User < ApplicationRecord
    has_secure_password
    has_and_belongs_to_many :movies
    def user_params
        params.require(:user).permit( :username, :email, :password )
    end

end
