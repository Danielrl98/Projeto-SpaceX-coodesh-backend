class Launches {

    tableName = 'launches'

    verifyExistTable() {
        return `SELECT 1 FROM information_schema.tables WHERE table_name = "${this.tableName}" LIMIT 1;`
    }
    createAndInsert() {
        return `CREATE TABLE ${this.tableName} ( 
            id INT AUTO_INCREMENT PRIMARY KEY, 
            flight_number INT,
            name VARCHAR(255),
            date_utc VARCHAR(255),
            date_unix INT,
            date_local VARCHAR(255),
            date_precision VARCHAR(255),
            static_fire_date_utc VARCHAR(255),
            static_fire_date_unix INT,
            tbd VARCHAR(255),
            net  BOOLEAN,
            window INT,
            rocket VARCHAR(255),
            success BOOLEAN,
            failures VARCHAR(255),
            upcoming BOOLEAN,
            details VARCHAR(255),
            fairings VARCHAR(255),
            crew VARCHAR(255),
            ships VARCHAR(255),
            payloads VARCHAR(255),
            launchpad VARCHAR(255),
            cores VARCHAR(255),
            links VARCHAR(255),
            auto_update BOOLEAN,
            launch_library_id VARCHAR(255)
 );`

    }
    deleteDataTable() {
        return `delete from ${this.tableName}`
    }
    insertDataCron(flight_number,name,date_utc,date_unix,date_local,date_precision,static_fire_date_utc,static_fire_date_unix,tbd,net,window,rocket,success,failures,upcoming,details,fairings,crew,ships,payloads,launchpad,cores,links,auto_update,launch_library_id) {

        return `INSERT INTO ${this.tableName} (id,flight_number,name,date_utc,date_unix,date_local,date_precision,static_fire_date_utc,static_fire_date_unix,tbd,net,window,rocket,success,failures,upcoming,details,fairings,crew,ships,payloads,launchpad,cores,links,auto_update,launch_library_id) VALUES(null,
            "${flight_number}",
            "${name}",
            "${date_utc}",
            "${date_unix}",
            "${date_local}",
            "${date_precision}",
            "${static_fire_date_utc}",
            "${static_fire_date_unix}",
            "${tbd}",
            "${net}",
            "${window}",
            "${rocket}",
            "${success}",
            '${JSON.stringify(failures)}',
            '${upcoming}',
            '${toString(details).replaceAll('"','')}',
            '${JSON.stringify(fairings)}',
            '${JSON.stringify(crew)}',
            '${JSON.stringify(ships)}',
            '${JSON.stringify(payloads)}',
             "${launchpad}",
             '${JSON.stringify(cores)}',
             '${JSON.stringify(links)}',
             "${auto_update}",
             "${launch_library_id}"
            
        )`
    }
}
module.exports = Launches