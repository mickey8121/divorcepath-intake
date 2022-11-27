const formatPhone = (phone: string | number, showCode = false): string | null => {
  const cleaned = `${phone}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d|\+\d|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const intlCode = showCode && match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  return null;
};

export default formatPhone;
