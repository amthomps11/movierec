class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.integer :user1Id
      t.integer :user2Id
      t.boolean :confirmed

      t.timestamps
    end
  end
end
