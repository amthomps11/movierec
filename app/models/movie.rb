class Movie < ApplicationRecord
    has_and_belongs_to_many :users
    has_many :comments
    has_and_belongs_to_many :recommendations

end
