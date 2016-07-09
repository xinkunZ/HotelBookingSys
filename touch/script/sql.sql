select * from category where code like 'second';
select * from room;
select * from member;
select * from subscription;
select * from reside;
    select
        room0_.uuid as uuid13_,
        room0_.cateId as cateId13_,
        room0_.roomNo as roomNo13_ 
    from
        room room0_ 
    inner join
        category category1_ 
            on room0_.cateId=category1_.uuid 
    where
        category1_.code=?
select * from room inner join category on room.cateId=category.uuid where category.code='first';
select * from room;

