import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.avantai.ca';

export async function GET() {
    let blogLines = '';

    try {
        const reader = createReader(process.cwd(), keystaticConfig);
        const postSlugs = await reader.collections.posts.list();
        const posts = await Promise.all(
            postSlugs.map(async (slug) => ({ slug, post: await reader.collections.posts.read(slug) }))
        );

        const livePosts = posts
            .filter(({ post }) => post && !post.draft)
            .sort((a, b) => {
                const dateA = a.post?.publishedAt ? new Date(a.post.publishedAt).getTime() : 0;
                const dateB = b.post?.publishedAt ? new Date(b.post.publishedAt).getTime() : 0;
                return dateB - dateA;
            });

        blogLines = livePosts
            .map(({ slug, post }) => `- ${post?.title ?? slug}: ${baseUrl}/blog/${slug}`)
            .join('\n');
    } catch (error) {
        console.error('Failed to read blog posts for llms.txt:', error);
    }

    const content = `# Avant — AI Audits & Implementation for PE, VC & Family Offices

> Avant builds AI audits and custom implementations for private equity, venture capital, and family offices. We find where AI delivers the most ROI inside your firm, then build and ship the systems — calibrated to how your firm actually works, in weeks, not quarters.

## What we do
- AI Audit: a fixed-scope (~2–3 weeks) assessment of your investment process. Deliverables: a quantified AI readiness scorecard (data, tooling, talent, process, adoption), a tooling & enablement plan, ranked AI opportunities across the deal lifecycle, and a costed, phased implementation roadmap delivered in a live executive readout. Two tiers — a Firm Audit and a Portfolio Audit (adds portfolio-company assessment and a value-creation roadmap). Pricing on request; the full audit fee is credited toward any implementation you commission.
- Custom Software: fully custom software and AI workflows for a dedicated process — shipped in 2–4 weeks, built on your playbook. AI-enabled where it helps or with no AI at all, running securely in the cloud you control or entirely on-device. Built for any team, including those that don't use Claude or ChatGPT.
- Workshops: hands-on AI enablement workshops that build practical, compliant AI capability inside a fund's existing teams and tools — from analysts to partners, working in systems the firm has already approved. No new vendor to onboard.

## How we work
Every engagement runs inside your environment. No documents are uploaded to third parties; data does not leave your systems.

## Pages
- Homepage: ${baseUrl}
- AI Audit: ${baseUrl}/services
- Custom Software: ${baseUrl}/software
- Workshops: ${baseUrl}/workshops
- About: ${baseUrl}/about
- Case Studies: ${baseUrl}/case-studies
- Insights: ${baseUrl}/blog
- Contact: ${baseUrl}/contact

## Founder
Patrick Alpaugh, MBA — Founder & CEO. Former analyst at Massey Capital (PE) and Redstick Ventures (VC), where he ran a 450+ company pipeline and authored investor-grade memos, then led the rollout of Nomad Go's Spatial AI inventory product to large restaurant brands.

## Insights
${blogLines}

## Contact
Email: patricka@avantai.ca
Phone: (705) 984-5337
`;

    return new Response(content, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
