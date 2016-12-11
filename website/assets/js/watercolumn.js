function loadWaterColumnTable(groupwatercolumn_id, groupwatercolumn_name) {
	$.ajax({
		type: 'GET',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?',
		data: {
			'action' : 'get_by_groupid',
			'id' :  groupwatercolumn_id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {

			if (data.message != 'NoData') {
				parseDataToWaterColumnTable(data.message, groupwatercolumn_id, groupwatercolumn_name);
			} else {
				parseDataToWaterColumnTable([], groupwatercolumn_id, groupwatercolumn_name);
			}
		}
	});
}

function parseDataToWaterColumnTable(data, groupwatercolumn_id, groupwatercolumn_name) {
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
			'<button type="button" class="btn btn-icon-toggle" onclick="loadWaterColumnValueTable('+ groupwatercolumn_id + ',\'' + groupwatercolumn_name + '\',' + data[i].id + ',\'' + data[i].name + '\')" data-toggle="tooltip" data-placement="top" data-original-title="View Details"><i class="fa fa-eye"></i></button>' +
			'<button type="button" class="btn btn-icon-toggle" onclick="showWaterColumnEditForm('+ data[i].id +',\'' + data[i].name +'\','+ data[i].height + ',' + data[i].latitude + ',' + data[i].longitude + ',\'' + data[i].note + '\','+ data[i].gmsnumber +')" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i></button>' +
			'<button type="button" class="btn btn-icon-toggle" onclick="deleteWaterColumn('+ data[i].id + ')" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>' +
			'</td></tr>';
	}
		
	// close tbody of table
	resultOfTableHTML = resultOfTableHTML + '</tbody>';
	mainTable.innerHTML = resultOfTableHTML;
	mainTitle.innerHTML = 'HỒ HÒA TRUNG: ' + groupwatercolumn_name;
	mainTopNavigation.innerHTML = "" +
		'<br>' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-default" id="main-back" href="javascript: void(0)" onclick="loadWaterColumnTable()">Back</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-accent" id="main-create" href="javascript: void(0)" onclick="showWaterColumnCreateForm(' + groupwatercolumn_id +')">Create</button>';
}

function showWaterColumnCreateForm(groupwatercolumn_id) {
	document.getElementById('formWaterColumnModalLabel').innerText = 'CREATE WATER COLUMN';
	document.getElementById('watercolumnname').value = '';
	document.getElementById('watercolumnlatitude').value = '';
	document.getElementById('watercolumnlongitude').value = '';
	document.getElementById('watercolumnnote').value = '';
	document.getElementById('watercolumnsubmit').onclick = function() { createWaterColumn(groupwatercolumn_id); };
	$("#watercolumn-modal").modal();
}

function createWaterColumn(groupwatercolumn_id) {
	var name = document.getElementById('watercolumnname').value;
	var height = document.getElementById('watercolumnheight').value;
	var latitude = document.getElementById('watercolumnlatitude').value;
	var longitude = document.getElementById('watercolumnlongitude').value;
	var note = document.getElementById('watercolumnnote').value;
	var gmsnumber = document.getElementById('watercolumngmsnumber').value;

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	$("#watercolumn-modal").modal('hide');

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?action=create',
		data: {
			'groupwatercolumn_id' : groupwatercolumn_id,
			'name': name,
			'height': height,
			'latitude': latitude,
			'longitude' : longitude,
			'note' : note,
			'gmsnumber' : gmsnumber
		},
		success: function(data) {
			loadWaterColumnTable();
			toastr.success('Create success');
		},
		error: function(data) {
			toastr.error('Create fail');
		}
	});
}

function showWaterColumnEditForm(id, name, height, latitude, longitude, note, gmsnumber) {
	document.getElementById('formWaterColumnModalLabel').innerText = 'EDIT  WATER COLUMN';
	document.getElementById('watercolumnname').value = name;
	document.getElementById('watercolumnheight').value = height;
	document.getElementById('watercolumnlatitude').value = latitude;
	document.getElementById('watercolumnlongitude').value = longitude;
	document.getElementById('watercolumnnote').value = note;
	document.getElementById('watercolumngmsnumber').value = gmsnumber;
	document.getElementById('watercolumnsubmit').onclick = function() { editWaterColumn(id); };
	$("#watercolumn-modal").modal();
}

function editWaterColumn(id) {
	var name = document.getElementById('watercolumnname').value;
	var height = document.getElementById('watercolumnheight').value;
	var latitude = document.getElementById('watercolumnlatitude').value;
	var longitude = document.getElementById('watercolumnlongitude').value;
	var note = document.getElementById('watercolumnnote').value;
	var gmsnumber = document.getElementById('watercolumngmsnumber').value;

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	$("#watercolumn-modal").modal('hide');

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?action=edit',
		data: {
			'id' : id,
			'name': name,
			'height': height,
			'latitude': latitude,
			'longitude' : longitude,
			'note' : note,
			'gmsnumber': gmsnumber,
		},
		success: function(data) {
			loadWaterColumnTable();
			toastr.success('Edit success');
		},
		error: function(data) {
			toastr.error('Edit fail');
		}
	});
}

function deleteWaterColumn(id) {

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

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

