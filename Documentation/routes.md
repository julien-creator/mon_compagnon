nb : reprendre contact pour la structure du model de adoption car le status renvoyer est 0 ou 1 au lieu de "message lu" et "message non lu"  


# Index

```js
import { Router } from "express";
import contact_routes from "./contact.routes.js";
import user_routes from "./user.routes.js";
import resident_routes from "./resident.routes.js";
import adoption_routes from "./adoption.routes.js";
import auth_routes from "./auth.routes.js";

const router = Router();

// Exemple de route
router.get("/", (req, res) => {
    res.json({ msg: "Bienvenue sur l'API!" });
});

router.use("/contact", contact_routes);
router.use("/user", user_routes);
router.use("/resident", resident_routes);
router.use("/adoption", adoption_routes);
router.use("/authentication", auth_routes);

// Route pour gérer les erreurs 404
router.get("*", (req, res) => {
    res.status(404).json({ msg: "Aie caramba ! C'est not found là !" });
});

export default router;

```


### Contact 

- POST /create : qui utilise la méthode "createContact" du controller "contact.js". Cette méthode dépend du model "Contact.js" est de sa méthode "create" => 


```js
static async create(firstname, lastname, email, message) {
        const INSERT = "INSERT INTO contact (firstname, lastname, email, message) VALUES (?, ?, ? ,? )";
        const [result] = await pool.execute(INSERT, [firstname, lastname, email, message]);
        return { id: result.insertId, firstname, lastname, email, message };
    }
//Testé !    
```


- GET /all : qui utilise la méthode "getAllContacts" du controller "contact.js". Cette méthode dépend du model "Contact.js" est de sa méthode "findAll" => 


```js
static async findAll() {
        const SELECT_ALL = `
            SELECT id, firstname, lastname, email, message, 
            CASE 
                WHEN status = 0 THEN 'message non lu' 
                WHEN status = 1 THEN 'message lu' 
            END AS status
            FROM contact
            `;
        const [rows] = await pool.execute(SELECT_ALL);
        return rows;
    }
//Testé !    
```

- GET /:id : qui utilise la méthode "getById" du controller "contact.js". Cette méthode dépend du model "Contact.js" est de sa méthode "findById" => 


```js
static async findById(id) {
        const SELECT_BY_ID = `
            SELECT 
                id, 
                firstname, 
                lastname, 
                email, 
                message, 
                CASE 
                    WHEN status = 0 THEN 'message non lu' 
                    WHEN status = 1 THEN 'message lu' 
                    ELSE 'status inconnu' 
                END AS status
            FROM contact 
            WHERE id = ?;
        `;
        const [rows] = await pool.execute(SELECT_BY_ID, [id]);
        if (rows.length > 0) {
            return rows[0]; // Retourne le contact trouvé
        }
        return null; // Retourne null si aucun contact trouvé
    }
//Testé !      
```

- PATCH /update/:id: qui utilise la méthode "updateContactStatus" du controller "contact.js". Cette méthode dépend du model "Contact.js" est de sa méthode "updateStatus" => 


```js
 static async updateStatus(status, id) {
        const UPDATE = `
            UPDATE contact 
            SET status = ? 
            WHERE id = ?;
        `;
        const SELECT_UPDATED = `
            SELECT id, firstname, lastname, email, message, 
            CASE 
                WHEN status = 0 THEN 'message non lu' 
                WHEN status = 1 THEN 'message lu' 
            END AS status
            FROM contact
            WHERE id = ?;
        `;

        // Exécution de la mise à jour
        await pool.execute(UPDATE, [status, id]);

        // Sélection du contact mis à jour pour récupérer le statut avec l'affichage conditionnel
        const [rows] = await pool.execute(SELECT_UPDATED, [id]);

        return rows[0];  // Retourne le contact mis à jour avec le nouveau statut sous forme de texte
    }
//Testé !   
```

- DELETE /delete/:id: qui utilise la méthode "removeContact" du controller "contact.js". Cette méthode dépend du model "Contact.js" est de sa méthode "remove" => 


```js
 static async remove(id) {
        const DELETE = "DELETE FROM contact WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
//Testé !   
```


### User

- GET /list : qui utilise la méthode "getAllUsers" du controller "user.js". Cette méthode dépend du model "User.js" est de sa méthode "findAll" => 

```js
static async findAll() {
        const SELECT_ALL_USERS = "SELECT id, firstname, lastname, email, phone, role FROM user";
        return await pool.execute(SELECT_ALL_USERS);
    }
```

- GET /:id : qui utilise la méthode "getUsersById" du controller "user.js". Cette méthode dépend du model "User.js" est de sa méthode "findById" => 

```js
static async findById(id) {
        const SELECT_USER = "SELECT id, firstname, lastname, email, phone, role FROM user WHERE id = ?";
        return await pool.execute(SELECT_USER, [id]);
    }
```

- DELETE /delete/:id : qui utilise la méthode "removeUser" du controller "user.js". Cette méthode dépend du model "User.js" est de sa méthode "remove" => 

```js
static async remove(id) {
        const DELETE_USER = "DELETE FROM user WHERE id = ?";
        return await pool.execute(DELETE_USER, [id]);
    }
```

### Auth

- POST /register : qui utilise la méthode "createAccount" du controller "auth.js". Cette méthode dépend du model "Auth.js" est de ses méthodes "create", "findOneByEmail" et "hash" de bcrypt (externe) => 

```js
static async create(datas) {
        const INSERT = "INSERT INTO user (firstname, lastname, email, password, phone, birthdate) VALUES (?, ?, ?, ?, ?, ?)";
        return await pool.execute(INSERT, [...Object.values(datas)]);
    }

static async findOneByEmail(email) {
        const SELECT =
            "SELECT id, email, password, role FROM `user` WHERE email = ?";
        return await pool.execute(SELECT, [email]);
    }    
```

- POST /login : qui utilise la méthode "login" du controller "auth.js". Cette méthode dépend du model "Auth.js" est des méthodes "findOneByEmail" et "compare" de bcrypt (externe) => 

```js
static async findOneByEmail(email) {
        const SELECT =
            "SELECT id, email, password, role FROM `user` WHERE email = ?";
        return await pool.execute(SELECT, [email]);
    } 
```

- POST /logout : Appelle la méthode logout dans le contrôleur "auth.js" pour détruire la session de l'utilisateur et supprimer son cookie de session. Cela permet de déconnecter l'utilisateur

```js
const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie("connect.sid");
        res.status(200).json({ msg: "User logged out", isLogged: false });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
```

- GET /check-auth : Permet de vérifier si l'utilisateur est authentifié en regardant la session. Si la session contient des informations utilisateur, elles sont renvoyées, sinon cela peut être utilisé pour indiquer que l'utilisateur n'est pas connecté.

```js
const check_auth = async (req, res) => {
    if (req.session.user) {
        res.json({ isLogged: true, user: req.session.user });
    } else {
        res.json({ isLogged: false });
    }
};
```

### Adoption

- ********

```js
static async findAll() {
        const SELECT_ALL = `
            SELECT 
                a.id AS adoption_id,
                a.receipt_date,
                CASE 
                    WHEN a.status = 0 THEN 'demande non traitée' 
                    WHEN a.status = 1 THEN 'demande traitée' 
                    ELSE 'statut inconnu' 
                END AS status,
                u.lastname,
                u.email,
                u.phone,
                r.name AS resident_name,
                rs.name AS resident_status_name
            FROM 
                adoption a
            JOIN 
                user u ON a.user_id = u.id
            JOIN 
                resident r ON a.resident_id = r.id
            JOIN 
                resident_status rs ON r.status_id = rs.id
            ORDER BY 
                a.receipt_date DESC;
        `;
        return await pool.query(SELECT_ALL);;
//Testé ! 
```

- ********

```js
static async findById(id) {
        const SELECT_ONE = `
            SELECT 
                adoption.id, 
                adoption.message, 
                adoption.time_slot, 
                adoption.receipt_date, 
                user.firstname, 
                user.lastname, 
                resident.name AS resident_name, 
                CASE 
                    WHEN adoption.status = 0 THEN 'demande non traitée' 
                    WHEN adoption.status = 1 THEN 'demande traitée' 
                    ELSE 'statut inconnu' 
                END AS status
            FROM adoption
            JOIN user ON adoption.user_id = user.id
            JOIN resident ON adoption.resident_id = resident.id
            WHERE adoption.id = ?;
        `;
        return await pool.execute(SELECT_ONE, [id]);
    };
//Testé ! 
```

- ********

```js
static async create(datas) {
        const INSERT = "INSERT INTO adoption (message, time_slot, user_id, resident_id) VALUES (?, ?, ?, ?)";
        return await pool.execute(INSERT, [...Object.values(datas)]);
    };
//Testé ! 
```

- ********

```js
static async checkUserAdoption(user_id) {
        const CHECK_USER_ADOPTION = `SELECT id FROM adoption WHERE user_id = ?;`;
        return await pool.execute(CHECK_USER_ADOPTION, [user_id]);
};
//Testé ! 
```

- ********

```js
static async checkResidentAdoption(resident_id) {
        const CHECK_RESIDENT_ADOPTION = `SELECT id FROM adoption WHERE resident_id = ?;`;
        return await pool.execute(CHECK_RESIDENT_ADOPTION, [resident_id]);
};
//Testé ! 
```

- ********

```js
static async updateStatus(id, status) {
        const UPDATE = `
            UPDATE adoption 
            SET status = ? 
            WHERE id = ?;
        `;
        return await pool.execute(UPDATE, [status, id]);

};
//Testé ! 
```

- ********

```js
static async remove(id) {
        const DELETE = "DELETE FROM adoption WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    
};
//Testé ! 
```

