import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button, Card, Field, Badge, Modal, Table, EmptyState } from '../dist/index.js';
import OrgChart from '../dist/sig/OrgChart.js';

test('botões usam type seguro e permitem composição com links', () => {
  assert.match(renderToStaticMarkup(h(Button, null, 'Salvar')), /type="button"/);
  const link = renderToStaticMarkup(h(Button, { as: 'a', href: '/painel' }, 'Painel'));
  assert.match(link, /href="\/painel"/);
  assert.doesNotMatch(link, /type=/);
});
test('campos conectam label, descrição e erro ao controle', () => {
  const html = renderToStaticMarkup(h(Field, { id: 'email', label: 'E-mail', error: 'Informe um e-mail', type: 'email' }));
  assert.match(html, /for="email"/);
  assert.match(html, /aria-describedby="email-description"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /role="alert"/);
});
test('componentes básicos renderizam sem Next ou Firebase', () => {
  const html = renderToStaticMarkup(h(Card, null,
    h(Badge, { variant: 'success' }, 'Ativo'),
    h(EmptyState, { title: 'Sem registros' }),
    h(Modal, { open: false, title: 'Detalhes', onClose() {} }, 'Conteúdo'),
    h(Table, { caption: 'Membros' }, h('tbody', null, h('tr', null, h('td', null, 'Ana'))))));
  assert.match(html, /npca-badge--success/);
  assert.match(html, /<dialog/);
  assert.match(html, /<caption>Membros<\/caption>/);
});
test('organograma mostra cargos ativos e omite membros inativos', () => {
  const html = renderToStaticMarkup(h(OrgChart, { members: [
    { id: '1', name: 'Ana', status: 'ativo', unit: 'diretoria-executiva', role: 'Presidente' },
    { id: '2', name: 'Bruno', status: 'inativo', unit: 'diretoria-executiva', role: 'Secretário' },
  ] }));
  assert.match(html, /Ana/);
  assert.doesNotMatch(html, /Bruno/);
});
