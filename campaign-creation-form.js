console.log('[cc] init');
console.log('[cc] CampTipoAcao');
console.log($('#CampTipoAcao'));
$('#CampTipoAcao').change(function (event) {
	console.log(`[cc][CampTipoAcao.change] handling event`);

	const val = $(this).val();
	console.log(`[cc][CampTipoAcao.change] val ${val}`);
	if (!val || (val && $('#preview-icon').hasClass('disabled'))) {
		console.log(`[cc][CampTipoAcao.change] toggling preview-icon class`);
		$('#preview-icon').toggleClass('enabled disabled');
	}
});

$('#preview-icon-container').tooltip({ title: 'opa' });
$('#preview-icon').click(function () {
	console.log(`[cc][PreviewIcon.click]`);
	if ($(this).hasClass('disabled')) {
		console.log(`[cc][PreviewIcon.click] disabled. returning`);
		return;
	}

	console.log(`[cc][PreviewIcon.click] getting image for ${$('#CampTipoAcao').val()}`);
	$('#img-preview img').attr('src', getImageSrc($('#CampTipoAcao').val()));
	console.log(`[cc][PreviewIcon.click] showing modal`);
	$('#img-preview').modal('show');
});

function getImageSrc(type) {
	return $(`#${type}`).attr('src');
}
