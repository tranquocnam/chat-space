# DB設計

## usersテーブル
|Column|Type|Options|index|
|------|----|-------|-----|
|name|string|null: false, unique: true|○|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :messeges
- has_many :groups_users
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Options|index|
|------|----|-------|-----|
|name|string|null: false|

### Association
- has_many :messeges
- has_many :groups_users
- has_many :users, through: :groups_users

## messagesテーブル
|Column|Type|Options|index|
|------|----|-------|-----|
|body|text|
|image|string|
|user_id|references|null: false, foreign_key: true|○|
|group_id|references|null: false, foreign_key: true|○|

### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user