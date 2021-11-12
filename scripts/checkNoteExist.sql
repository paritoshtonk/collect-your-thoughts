select EXISTS(
        select *
        from notes
        where id = ?
    ) as 'exists'