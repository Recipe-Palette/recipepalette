/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { format } from 'date-fns'
import { alpha } from '@theme-ui/color'

import { FiArrowUpRight } from 'react-icons/fi'

const TableRow = ({ children, ...props }) => (
  <div
    sx={{
      display: `grid`,
      gridTemplateColumns: `1fr 2fr 3fr 3fr 1fr`,
      gridGap: `2`,
      alignItems: `flex-start`,
    }}
    {...props}
  >
    {children}
  </div>
)

const TableHead = ({ children }) => (
  <div sx={{ fontWeight: `bold` }}>{children}</div>
)

const TableCell = ({ children, ...props }) => <div {...props}>{children}</div>

const LogTable = ({ versions, recipeId, ...props }) => {
  return (
    <table {...props} sx={{ width: `100%` }}>
      <div
        sx={{
          py: `2`,
          borderBottom: theme => `1px solid ${theme.colors.border}`,
        }}
      >
        <TableRow>
          <TableHead>Version No.</TableHead>
          <TableHead>Date Edited</TableHead>
          <TableHead>Adjustment Notes</TableHead>
          <TableHead>Fields Changed</TableHead>
          <TableHead>View</TableHead>
        </TableRow>
      </div>
      {versions.map((version, index) => (
        <TableRow
          key={index}
          sx={{
            px: `1`,
            py: `2`,
            borderBottom: theme => `1px solid ${theme.colors.border}`,
            '&:nth-child(even)': {
              backgroundColor: alpha(`gray`, 0.05),
            },
            '&:nth-child(odd)': {
              backgroundColor: `background`,
            },
          }}
        >
          <TableCell>
            {version.version} {index === 0 ? `(latest)` : ``}
          </TableCell>
          <TableCell>{format(new Date(version.created_at), `Pp`)}</TableCell>
          <TableCell>{version.notes}</TableCell>
          <TableCell>{version.log}</TableCell>
          <TableCell>
            <Link
              to={`/recipe/${recipeId}/${
                index === 0 ? `latest` : version.version
              }`}
              sx={{
                variant: `buttons.secondary`,
                display: `flex`,
                alignItems: `center`,
              }}
            >
              View <FiArrowUpRight />
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </table>
  )
}

export default LogTable
