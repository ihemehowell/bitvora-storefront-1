alter table merchants add column is_owner boolean not null default false;

update merchants
set is_owner = true
where user_id = (select id from auth.users where email = 'howelldevs@gmail.com');