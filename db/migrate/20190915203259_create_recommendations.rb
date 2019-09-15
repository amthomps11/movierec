class CreateRecommendations < ActiveRecord::Migration[6.0]
  def change
    create_table :recommendations do |t|
      t.references :movie, null: false, foreign_key: true
      t.references :recommended_to
      t.references :recommended_from

      t.timestamps
    end
  end
end
