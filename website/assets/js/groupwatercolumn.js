$(document).ready(function(){
	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	loadGroupWaterColumnTable(1);
});

function loadGroupWaterColumnTable(area_id) {
	$.removeCookie('area_id');
	$.removeCookie('groupwatercolumn');

	$.ajax({
		type: 'GET',
		url: 'http://localhost/ground_water/api/admin/controller/groupwatercolumns.php?',
		data: {
			'action' : 'get_by_areaid',
			'id' : area_id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {
			parseDataToGroupWaterColumnTable(data.message);
		}
	});

	$.cookie('area_id', area_id, { expires: 7 });
}

function parseDataToGroupWaterColumnTable(data = null) {
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
								<th>Group Water Name</th>
								<th>Latitude</th>
								<th>Longitude</th>
								<th>Note</th>
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
				'<td>' + data[i].latitude +'</td>' +
				'<td>' + data[i].longitude +'</td>' +
				'<td>' + data[i].note +'</td>' +
				'<td class="text-right">' +
				'<button type="button" class="btn btn-icon-toggle" onclick="waterColummInit('+ data[i].id + ',\'' + data[i].name + '\')" data-toggle="tooltip" data-placement="top" data-original-title="Details"><i class="fa fa-eye"></i></button>' +
				'<button type="button" class="btn btn-icon-toggle" onclick="showGroupWaterColumnEditForm('+ data[i].id +',\'' + data[i].name +'\',' + data[i].latitude + ',' + data[i].longitude + ',\'' + data[i].note + '\')" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i></button>' +
				'<button type="button" class="btn btn-icon-toggle" onclick="deleteGroupWaterColumn('+ data[i].id + ')" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>' +
				'</td></tr>';
		}
	}
		
	// close tbody of table
	resultOfTableHTML = resultOfTableHTML + '</tbody>';
	mainTable.innerHTML = resultOfTableHTML;
	mainTitle.innerHTML = 'AREA: ' + 'HỒ HÒA TRUNG';
	mainTopNavigation.innerHTML = `
		<br>
		<button type ="button" class="btn ink-reaction btn-raised btn-default" id="main-back" href="javascript: void(0)"><i class="fa fa-arrow-left fa-fw"></i>Back</button>
		<button type ="button" class="btn ink-reaction btn-raised btn-accent" id="main-create" href="javascript: void(0)" onclick="showGroupWaterColumnCreateForm()"><i class="fa fa-plus fa-fw"></i>Create</button>`;
	
	$(".modal").load("../../group_water_column/_form.html");
}

function showGroupWaterColumnCreateForm() {
	var name = '';
	var latitude = '';
	var longitude = '';
	var note = '';

	if ($.cookie('groupwatercolumns')) {
		var groupwatercolumns = JSON.parse($.cookie('groupwatercolumns'));
		name = groupwatercolumns['name'];
		latitude = groupwatercolumns['latitude'];
		longitude = groupwatercolumns['longitude'];
		note = groupwatercolumns['note'];
		$.removeCookie('groupwatercolumns');
	}

	document.getElementById('formGroupWaterColumnModalLabel').innerText = 'CREATE GROUP WATER COLUMN';
	document.getElementById('groupwatercolumnname').value = name ? name : '';
	document.getElementById('groupwatercolumnlatitude').value = latitude ? latitude : '';
	document.getElementById('groupwatercolumnlongitude').value = longitude ? longitude : '';
	document.getElementById('groupwatercolumnnote').value = note ? note : '';
	document.getElementById('groupwatercolumnback').onclick = function() { $(".modal").modal('hide'); };
	document.getElementById('groupwatercolumnsubmit').onclick = function() { showGroupWaterColumnConfirmForm(); };
	$(".modal").modal();
}

function showGroupWaterColumnEditForm(id = null, name = null, latitude = null, longitude = null, note = null) {
	if ($.cookie('groupwatercolumns')) {
		var groupwatercolumns = JSON.parse($.cookie('groupwatercolumns'));
		name = groupwatercolumns['name'];
		latitude = groupwatercolumns['latitude'];
		longitude = groupwatercolumns['longitude'];
		note = groupwatercolumns['note'];
		$.removeCookie('groupwatercolumns');
	}

	document.getElementById('formGroupWaterColumnModalLabel').innerText = 'EDIT GROUP WATER COLUMN';
	document.getElementById('groupwatercolumnname').value = name;
	document.getElementById('groupwatercolumnlatitude').value = latitude;
	document.getElementById('groupwatercolumnlongitude').value = longitude;
	document.getElementById('groupwatercolumnnote').value = note;
	document.getElementById('groupwatercolumnback').onclick = function() { $(".modal").modal('hide'); };
	document.getElementById('groupwatercolumnsubmit').onclick = function() { showGroupWaterColumnConfirmForm(id); };
	$(".modal").modal();
}

function showGroupWaterColumnConfirmForm(id = null) {
	document.getElementById('formGroupWaterColumnModalLabel').innerText = 'CONFIRM GROUP WATER COLUMN';
	document.getElementById('groupwatercolumnname').readOnly = true;
	document.getElementById('groupwatercolumnlatitude').readOnly = true;
	document.getElementById('groupwatercolumnlongitude').readOnly = true;
	document.getElementById('groupwatercolumnnote').readOnly  = true;
	document.getElementById('groupwatercolumnback').innerHTML = '<i class="fa fa-arrow-left fa-fw"></i>back';
	document.getElementById('groupwatercolumnback').onclick = function() {
		// set value have just put
		$.cookie('groupwatercolumns', JSON.stringify({
			name: document.getElementById('groupwatercolumnname').value,
			latitude: document.getElementById('groupwatercolumnlatitude').value,
			longitude: document.getElementById('groupwatercolumnlongitude').value,
			note: document.getElementById('groupwatercolumnnote').value
		}), { expires: 7 });

		// reset form readonly
		document.getElementById('groupwatercolumnname').readOnly = false;
		document.getElementById('groupwatercolumnlatitude').readOnly = false;
		document.getElementById('groupwatercolumnlongitude').readOnly = false;
		document.getElementById('groupwatercolumnnote').readOnly  = false;
		this.innerHTML = '<i class="fa fa-times fa-fw" aria-hidden="true"></i>Cancel';
		document.getElementById('groupwatercolumnsubmit').innerHTML = '<i class="fa fa-check fa-fw" aria-hidden="true"></i>Next';

		id ? showGroupWaterColumnEditForm(id) : showGroupWaterColumnCreateForm();
	};

	document.getElementById('groupwatercolumnsubmit').innerHTML = '<i class="fa fa-floppy-o fa-fw" aria-hidden="true"></i>Save';
	document.getElementById('groupwatercolumnsubmit').onclick = function() {
		id ? saveGroupWaterColumn(id) : saveGroupWaterColumn();

		// remove area_id cookie
		$.cookie('area_id');

		// reset form
		document.getElementById('groupwatercolumnname').readOnly = false;
		document.getElementById('groupwatercolumnlatitude').readOnly = false;
		document.getElementById('groupwatercolumnlongitude').readOnly = false;
		document.getElementById('groupwatercolumnnote').readOnly  = false;
	};
}

function saveGroupWaterColumn(id = null) {
	var name = document.getElementById('groupwatercolumnname').value;
	var latitude = document.getElementById('groupwatercolumnlatitude').value;
	var longitude = document.getElementById('groupwatercolumnlongitude').value;
	var note = document.getElementById('groupwatercolumnnote').value;
	var action = '';
	var groupwatercolumns = [];

	if (id == null) {
		action = 'create';
		groupwatercolumns = {
			area_id : $.cookie('area_id'),
			name : name,
			latitude : latitude,
			longitude : longitude,
			note : note
		};
	} else {
		action = 'edit';
		groupwatercolumns = {
			id : id,
			name : name,
			latitude : latitude,
			longitude : longitude,
			note : note,
		};
	}

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/groupwatercolumns.php?action=' + action,
		data: groupwatercolumns,
		success: function(data) {
			$(".modal").modal('hide');
			loadGroupWaterColumnTable(1);
			toastr.success(toTitleCase(action + ' success'));
		},
		error: function(data) {
			toastr.error(toTitleCase(action + ' fail'));
		}
	});
}

function deleteGroupWaterColumn(id) {
	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/groupwatercolumns.php?action=delete',
		data: {
			'id' : id
		},
		success: function(data) {
			loadGroupWaterColumnTable(1);
			toastr.success('Delete success');
		},
		error: function(data) {
			toastr.error('Delete fail');
		}
	});
}