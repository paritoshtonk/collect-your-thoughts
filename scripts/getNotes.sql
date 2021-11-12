SELECT n.id,
    c.category_name,
    n.category_id,
    n.title,
    n.body,
    n.html
from Notes n
    INNER JOIN Category c ON c.id = n.category_id
ORDER BY c.id,
    n.id