alter table stores add column typography jsonb default '{"pairing": "editorial", "scale": "standard"}'::jsonb;
alter table stores add column social_links jsonb default '{}'::jsonb;
alter table stores add column grid_density smallint default 3;