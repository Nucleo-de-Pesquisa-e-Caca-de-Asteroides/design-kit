# @npca/design-kit

Biblioteca npm dos componentes existentes no website, SARA e SIG do NPCA, mais componentes básicos reutilizáveis. React 19, Next.js 15/16, módulos ESM. Não contém configuração ou credenciais do Firebase. Não publicada no registro npm.

## Instalação local

Na pasta `npca/design-kit`:

```sh
npm install --legacy-peer-deps
npm run build
npm test
npm pack
```

Em cada aplicação, instale o arquivo `.tgz` gerado. Exemplo no SIG:

```sh
npm install ../design-kit/npca-design-kit-0.1.0.tgz
```

No website/v0.1.1 e sara/v0.2.6, use `../../design-kit/npca-design-kit-0.1.0.tgz`. Os aplicativos existentes ainda usam seus componentes locais; instalar e trocar os imports é uma migração separada. O pacote não modifica os aplicativos automaticamente.

## Componentes básicos

```jsx
import { Button, Card, Field, Badge, Modal, Table, EmptyState } from '@npca/design-kit';
import '@npca/design-kit/styles.css';

<Card>
  <Field label="Nome" name="name" autoComplete="name" required />
  <Button variant="secondary" onClick={salvar}>Salvar</Button>
</Card>
```

Button aceita `variant="primary|secondary|outline"` e `as` (inclusive Next Link com `as={Link}` e `href`). Field aceita input, `as="textarea"`, `as="select"`, `hint`, `error` e atributos HTML. Modal é controlado por `open` e `onClose`, usa dialog nativo para foco e Escape. Table recebe elementos thead/tbody e caption. Badge aceita neutral, warning, success e danger. Os componentes básicos usam classes `npca-*` para evitar colisões com os componentes existentes.

## Todos os componentes existentes

| Import | Exports | Origem |
| --- | --- | --- |
| `@npca/design-kit/website` | Header, Footer, Button, FeedStatus, EditorialHero, PublicationBlock, PublicationNotFound, formatDate | website/v0.1.1 |
| `@npca/design-kit/sara` | Navbar, Footer | sara/v0.2.6 |
| `@npca/design-kit/sig` | Navbar, Footer, AuthGuard, MemberModal, OrgChart | sig |
| `@npca/design-kit/firebase` | NPCAFirebaseProvider, useNPCAFirebase | integração compartilhada |
| `@npca/design-kit/organization` | organizationalUnits, rolesByUnit, unitLabel, getMemberPositions, hasRoleAccumulation, isExclusiveRole, canPublishDocuments | regras de organização do SIG |

Os exports website/sara/sig mantêm a API dos componentes de origem. Para evitar nomes iguais, use aliases, por exemplo `import { Navbar as SaraNavbar } from '@npca/design-kit/sara'`. Button do website continua sendo um link; o Button da raiz oferece botão HTML e composição por `as`.

Os componentes específicos requerem Next.js e @phosphor-icons/react. Firebase é necessário para SARA Navbar, SIG Navbar e AuthGuard. SARA Navbar também requer react-hot-toast e um Toaster no aplicativo. O import da raiz contém apenas os componentes básicos, sem carregar Next, Firebase ou toast.

## Estilos dos projetos

No layout raiz, importe **um** perfil correspondente ao aplicativo:

```jsx
import '@npca/design-kit/website.css'; // ou sara.css / sig.css
```

Esses perfis incluem os estilos globais originais mais o tema comum; não combine os três no mesmo aplicativo. Para adicionar os componentes básicos a um perfil, importe também styles.css. Para manter o CSS local de um aplicativo, importe apenas theme.css depois dele. Os sistemas usam `<body className="npca-app">` para os ajustes específicos. Header do website espera `/logo.png`, fornecido pelo próprio aplicativo.

## Integração Firebase

Crie um wrapper client no aplicativo; use as instâncias já configuradas nele:

```jsx
'use client';
import { NPCAFirebaseProvider } from '@npca/design-kit/firebase';
import { Navbar } from '@npca/design-kit/sara';
import { auth, database } from '@/firebase';

export default function Navigation() {
  return <NPCAFirebaseProvider auth={auth} database={database}>
    <Navbar />
  </NPCAFirebaseProvider>;
}
```

No SIG basta passar auth. AuthGuard e Navbar devem estar dentro do provider. O provider não inicializa apps Firebase e não altera regras de acesso. Permissões precisam continuar aplicadas pelas regras do banco e pelo servidor; os controles de interface não substituem autorização.

MemberModal recebe open, member, onClose, onSave e onDelete; a persistência continua no aplicativo. OrgChart recebe members. Páginas, endpoints, feeds de dados e configurações do Firebase não fazem parte da biblioteca de componentes.

## Manutenção e distribuição

O código em src é independente das pastas dos aplicativos: não usa aliases `@/` nem caminhos para fora do pacote. As cópias iniciais vêm das versões indicadas na tabela; alterações futuras devem ser feitas aqui e migradas para os aplicativos por atualização da dependência.

O build transforma JSX em JavaScript ESM e preserva `use client`. React e demais integrações são peer dependencies, sem empacotar cópias extras. dist contém componentes, estilos e módulos auxiliares; src, node_modules e arquivos de ambiente ficam fora do tarball. O lockfile fixa as ferramentas de compilação. Revise nome, versão, licença e acesso à organização npm antes de publicar.
