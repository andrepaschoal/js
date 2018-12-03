
$('#CampTipoAcao').change(function (event) {
	const val = $(this).val();

	if (!val || (val && $('#preview-icon').hasClass('disabled'))) {
		$('#preview-icon').toggleClass('enabled disabled');
	}
});

$('#preview-icon-container').tooltip({ title: 'opa' });
$('#preview-icon').click(function () {
	if ($(this).hasClass('disabled')) {
		return;
	}
	console.log(1);

	$('#img-preview img').attr('src', getImageSrc($('#CampTipoAcao').val()));
	$('#img-preview').modal('show');
});

function getImageSrc(type) {
	return $(`#${type}`).attr('src');
}
