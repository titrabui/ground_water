function waterColummInit(groupwatercolumn_id, groupwatercolumn_name) {
	$.cookie('groupwatercolumn', JSON.stringify({
		id: groupwatercolumn_id,
		name: groupwatercolumn_name
	}), { expires: 7 });

	loadWaterColumnTable();
}

function loadWaterColumnTable() {
	$.removeCookie('watercolumn');

	if ($.cookie('groupwatercolumn')) {
		var groupwatercolumn = JSON.parse($.cookie('groupwatercolumn'));
	}

	$.ajax({
		type: 'GET',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?',
		data: {
			'action' : 'get_by_groupid',
			'id' :  groupwatercolumn.id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {

			if (data.message != 'NoData') {
				parseDataToWaterColumnTable(groupwatercolumn, data.message);
			} else {
				parseDataToWaterColumnTable(groupwatercolumn);
			}
		}
	});
}

function parseDataToWaterColumnTable(groupwatercolumn, data = null) {
	var mainTable = document.getElementById('main-table');
	var mainTitle = document.getElementById('main-title');
	var mainTopNavigation = document.getElementById('top-navigation');
	var resultOfTableHTML = '';

	mainTopNavigation.innerHTML = '';
	mainTable.innerHTML = '';
	// init table HTML
	resultOfTableHTML = `<thead>
							<tr>
								<th>No</th>
								<th>Name</th>
								<th>Height</th>
								<th>Latitude</th>
								<th>Longitude</th>
								<th>Note</th>
								<th>GMS Number</th>
								<th class="text-right"></th>
							</tr>
						</thead>
						<tbody>`;
	if (data != null) {
		for (var i = 0; i < data.length; i++) {
			resultOfTableHTML = resultOfTableHTML +
				'<tr>' +
				'<td>' + (i + 1) +'</td>' +
				'<td>' + data[i].name +'</td>' +
				'<td>' + data[i].height +'</td>' +
				'<td>' + data[i].latitude +'</td>' +
				'<td>' + data[i].longitude +'</td>' +
				'<td>' + data[i].note +'</td>' +
				'<td>' + data[i].gmsnumber +'</td>' +
				'<td class="text-right">' +
				'<button type="button" class="btn btn-icon-toggle" onclick="waterColummValueInit('+ data[i].id + ',\'' + data[i].name + '\')" data-toggle="tooltip" data-placement="top" data-original-title="View Details"><i class="fa fa-eye"></i></button>' +
				'<button type="button" class="btn btn-icon-toggle" onclick="showWaterColumnEditForm('+ data[i].id +',\'' + data[i].name +'\','+ data[i].height + ',' + data[i].latitude + ',' + data[i].longitude + ',\'' + data[i].note + '\','+ data[i].gmsnumber +')" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i></button>' +
				'<button type="button" class="btn btn-icon-toggle" onclick="deleteWaterColumn('+ data[i].id + ')" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>' +
				'</td></tr>';
		}
	}
		
	// close tbody of table
	resultOfTableHTML = resultOfTableHTML + '</tbody>';
	mainTable.innerHTML = resultOfTableHTML;
	mainTitle.innerHTML = 'HỒ HÒA TRUNG: ' + groupwatercolumn.name;
	mainTopNavigation.innerHTML = "" +
		'<br>' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-default" id="main-back" href="javascript: void(0)" onclick="loadGroupWaterColumnTable(1)"><i class="fa fa-arrow-left fa-fw"></i>Back</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-accent" id="main-create" href="javascript: void(0)" onclick="showWaterColumnCreateForm()"><i class="fa fa-plus fa-fw"></i>Create</button>';

	$(".modal").load("../../water_column/_form.html");
}

function showWaterColumnCreateForm() {
	var name = '';
	var height = '';
	var latitude = '';
	var longitude = '';
	var note = '';
	var gmsnumber = '';

	if ($.cookie('watercolumn')) {
		var watercolumn = JSON.parse($.cookie('watercolumn'));
		name = watercolumn['name'];
		height = watercolumn['height'];
		latitude = watercolumn['latitude'];
		longitude = watercolumn['longitude'];
		note = watercolumn['note'];
		gmsnumber = watercolumn['gmsnumber'];
		$.removeCookie('watercolumn');
	}

	document.getElementById('formWaterColumnModalLabel').innerText = 'CREATE WATER COLUMN';
	document.getElementById('watercolumnname').value = name ? name : '';
	document.getElementById('watercolumnheight').value = height ? height : '';
	document.getElementById('watercolumnlatitude').value = latitude ? latitude : '';
	document.getElementById('watercolumnlongitude').value = longitude ? longitude : '';
	document.getElementById('watercolumnnote').value = note ? note : '';
	document.getElementById('watercolumngmsnumber').value = gmsnumber ? gmsnumber : '';
	document.getElementById('watercolumnback').onclick = function() { $(".modal").modal('hide'); };
	document.getElementById('watercolumnsubmit').onclick = function() { showWaterColumnConfirmForm(); };
	$(".modal").modal();
}

function showWaterColumnEditForm(id = null, name = null, height = null, latitude = null, 
											longitude = null, note = null, gmsnumber = null) {
	if ($.cookie('watercolumn')) {
		var watercolumn = JSON.parse($.cookie('watercolumn'));
		name = watercolumn['name'];
		height = watercolumn['height'];
		latitude = watercolumn['latitude'];
		longitude = watercolumn['longitude'];
		note = watercolumn['note'];
		gmsnumber = watercolumn['gmsnumber'];
		$.removeCookie('watercolumn');
	}

	document.getElementById('formWaterColumnModalLabel').innerText = 'EDIT WATER COLUMN';
	document.getElementById('watercolumnname').value = name;
	document.getElementById('watercolumnheight').value = height;
	document.getElementById('watercolumnlatitude').value = latitude;
	document.getElementById('watercolumnlongitude').value = longitude;
	document.getElementById('watercolumnnote').value = note;
	document.getElementById('watercolumngmsnumber').value = gmsnumber;
	document.getElementById('watercolumnback').onclick = function() { $(".modal").modal('hide'); };
	document.getElementById('watercolumnsubmit').onclick = function() { showWaterColumnConfirmForm(id); };
	$(".modal").modal();
}

function showWaterColumnConfirmForm(id = null) {
	document.getElementById('formWaterColumnModalLabel').innerText = 'CONFIRM WATER COLUMN';
	document.getElementById('watercolumnname').readOnly = true;
	document.getElementById('watercolumnheight').readOnly = true;
	document.getElementById('watercolumnlatitude').readOnly = true;
	document.getElementById('watercolumnlongitude').readOnly = true;
	document.getElementById('watercolumnnote').readOnly  = true;
	document.getElementById('watercolumngmsnumber').readOnly  = true;
	document.getElementById('watercolumnback').innerHTML = '<i class="fa fa-arrow-left fa-fw"></i>back';
	document.getElementById('watercolumnback').onclick = function() {
		// set value have just put
		$.cookie('watercolumn', JSON.stringify({
			name: document.getElementById('watercolumnname').value,
			height: document.getElementById('watercolumnheight').value,
			latitude: document.getElementById('watercolumnlatitude').value,
			longitude: document.getElementById('watercolumnlongitude').value,
			note: document.getElementById('watercolumnnote').value,
			gmsnumber: document.getElementById('watercolumngmsnumber').value
		}), { expires: 7 });

		// reset form readonly
		document.getElementById('watercolumnname').readOnly = false;
		document.getElementById('watercolumnheight').readOnly = false;
		document.getElementById('watercolumnlatitude').readOnly = false;
		document.getElementById('watercolumnlongitude').readOnly = false;
		document.getElementById('watercolumnnote').readOnly  = false;
		document.getElementById('watercolumngmsnumber').readOnly  = false;
		this.innerHTML = '<i class="fa fa-times fa-fw" aria-hidden="true"></i>Cancel';
		document.getElementById('watercolumnsubmit').innerHTML = '<i class="fa fa-check fa-fw" aria-hidden="true"></i>Next';

		id ? showWaterColumnEditForm(id) : showWaterColumnCreateForm();
	};

	document.getElementById('watercolumnsubmit').innerHTML = '<i class="fa fa-floppy-o fa-fw" aria-hidden="true"></i>Save';
	document.getElementById('watercolumnsubmit').onclick = function() {
		id ? saveWaterColumn(id) : saveWaterColumn();

		// reset form
		document.getElementById('watercolumnname').readOnly = false;
		document.getElementById('watercolumnheight').readOnly = false;
		document.getElementById('watercolumnlatitude').readOnly = false;
		document.getElementById('watercolumnlongitude').readOnly = false;
		document.getElementById('watercolumnnote').readOnly  = false;
		document.getElementById('watercolumngmsnumber').readOnly  = false;
	};
}

function saveWaterColumn(id = null) {
	var name = document.getElementById('watercolumnname').value;
	var height = document.getElementById('watercolumnheight').value;
	var latitude = document.getElementById('watercolumnlatitude').value;
	var longitude = document.getElementById('watercolumnlongitude').value;
	var note = document.getElementById('watercolumnnote').value;
	var gmsnumber = document.getElementById('watercolumngmsnumber').value;
	var action = '';
	var watercolumn = [];
	var groupwatercolumn = JSON.parse($.cookie('groupwatercolumn'));

	if (id == null) {
		action = 'create';
		watercolumn = {
			groupwatercolumn_id : groupwatercolumn.id,
			name : name,
			height : height,
			latitude : latitude,
			longitude : longitude,
			note : note,
			gmsnumber : gmsnumber
		};
	} else {
		action = 'edit';
		watercolumn = {
			id : id,
			name : name,
			height : height,
			latitude : latitude,
			longitude : longitude,
			note : note,
			gmsnumber : gmsnumber
		};
	}

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?action=' + action,
		data: watercolumn,
		success: function(data) {
			$(".modal").modal('hide');
			loadWaterColumnTable();
			toastr.success(toTitleCase(action + ' success'));
		},
		error: function(data) {
			toastr.error(toTitleCase(action + ' fail'));
		}
	});
}

function deleteWaterColumn(id) {
	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?action=delete',
		data: {
			'id' : id
		},
		success: function(data) {
			loadWaterColumnTable();
			toastr.success('Delete success');
		},
		error: function(data) {
			toastr.error('Delete fail');
		}
	});
}

