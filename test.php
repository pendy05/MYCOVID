<html>
<head>
</head>

<body>
	<h1>Welcome!</h1>
	<?php
    $csv = array_map("str_getcsv", file("cases_state.csv"));
		print "This is PHP";
        print $csv[0];
	?>
</body>

</html>
