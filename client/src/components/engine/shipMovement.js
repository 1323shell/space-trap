const shipMovement = (e, ship) => {
    ship.x = e.offsetX-25;
    ship.y = e.offsetY-13;
};

export default shipMovement;