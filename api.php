<?php
//api.php

if(isset($_REQUEST['cat']))
{
	switch($_REQUEST['cat'])
	{
		case "plants-by-size":
			include('data/PlantsBySize.json');
			break;
        
        case "plants-easy-to-grow":
            include('data/PlantsEasiestToGrow.json');
            break;
		default:
			include('data/PlantsEasiestToGrow.json');
	}
}else{

	echo "No parameter sent";

}
