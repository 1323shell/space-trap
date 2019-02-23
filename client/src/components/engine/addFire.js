const addFire = (fireArr, ship) => {
    fireArr.push({
            x: ship.x + 5,
            y: ship.y - 10,
            speedX: -0.5,
            speedY: -5
        }, {
            x: ship.x + 10,
            y: ship.y - 10,
            speedX: 0,
            speedY: -5
        }, {
            x: ship.x + 15,
            y: ship.y - 10,
            speedX: 0.5,
            speedY: -5
        }
    );

    return fireArr;
};

export default addFire;