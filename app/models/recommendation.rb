class Recommendation < ApplicationRecord
  belongs_to :movie
  belongs_to :recommended_to, :class_name => "User"
  belongs_to :recommended_from, :class_name => "User"
end
